class DoajController < ApplicationController
    def new
    end

    def show
        # Get search query and do URL encoding
        query = URI::encode(params[:query])

        search_for = 50
        page_size = 10

        # Call DOAJ API and save response in variable
        request = RestClient.get("https://doaj.org/api/v1/search/articles/#{query}" + "?pageSize=#{search_for}")

        if request.code == 200
        # Parse API response into a Ruby hash object
            response = JSON.parse(request)

            # Get the actual article objects
            results = response["results"]

            # "Helper" objects for kmap
            categories = {} # {["Biology"] => [1,2,3]}
            articles = {} # {1 => ["Biology"]}
            issns = {} # {"1234-4321" => [4,5,6]}

            #####################
            # Start creating kmap
            #####################

            # kmap objects
            kmap_timestamp = Time.now
            kmap_query = params["query"]
            kmap_nr_of_articles = results.length
            kmap_categories = []
            kmap_results = []

            # Normalize categories for each article and
            # ...start creating the article objects for the kmap
            results.each_with_index do |article, i|

                cats = []

                # Get issns
                article_issns = get_doaj_issns(article)
                    # Array. Returns nil, if no issns are indicated

                # Get lcc codes
                article_lccs = get_doaj_categories(article)
                    # Array. Returns nil, if no lcc codes are indicated

                if article_lccs != nil
                    # Check issn helper first
                    if article_issns != nil && issns[article_issns[0]] != nil
                        # Get kmapper categories from helper object
                        cats.push(issns[article_issns[0]][0])
                    else
                        # Get kmapper categories
                        article_lccs.each do |cat|
                            if cat.length == 1
                                record = Lcc.find_kmapper(cat, false)
                                if record.any?
                                    cats.push(record.first.label)
                                end
                            else
                                # It's a subclass
                                if cat[0,3] == "QA7"
                                    # It's computer science
                                    cats.push("Computer science")
                                else
                                    chars = cat[0,3].gsub(/[^a-zA-Z]/, "")
                                record = Lcc.find_kmapper(chars, true)
                                if record.any?
                                    cats.push(record.first.label)
                                end
                                end
                            end
                        end
                        article_issns.each do |issn|
                            issns[issn] = cats.sort.uniq
                        end 
                    end
                else
                    cats.push("Unknown")

                    article_issns.each do |issn|
                        issns[issn] = cats.sort.uniq
                    end 
                end

                # The kmapper categories for this article (incl. "Unknown") as an array
                cats = cats.sort.uniq

                # categories = {["Biology", "Chemistry"] => [4,5,6]}
                if categories[cats] != nil
                    current = categories[cats]
                    categories[cats] = current.push(i)
                else
                    categories[cats] = [i]
                end

                # article_cat = {1 => ["Biology", "Chemistry"]}
                articles[i] = cats

                info = article["bibjson"]
                hsh = {}

                hsh["id"] = i.to_s.rjust(3, "0")
                hsh["page"] = i/page_size
                hsh["title"] = nil
                hsh["authors"] = nil
                hsh["journal"] = nil
                hsh["year"] = nil
                hsh["doi"] = nil
                hsh["doaj"] = article["id"]
                hsh["abstract"] = nil

                # title
                if info.has_key? "title"
                    hsh["title"] = info["title"]
                end
                # authors
                if info.has_key? "author"
                    authors = info["author"]
                    if authors.length > 3
                        hsh["authors"] = authors[0]["name"] + " et al."
                    else
                        all = []
                        authors.each do |a|
                            all.push(a["name"])
                        end
                        hsh["authors"] = all.join(" • ")
                    end
                end
                # journal
                if info.has_key? "journal"
                    hsh["journal"] = info["journal"]["title"]
                end
                # year
                if info.has_key? "year"
                    hsh["year"] = info["year"]
                end
                # doi
                if info.has_key? "identifier"
                    ids = info["identifier"]
                    ids.each do |i|
                        if i["type"] == "doi"
                            hsh["doi"] = i["id"].gsub(" ","")
                        end
                    end
                end
                # abstract
                if info.has_key? "abstract"
                    hsh["abstract"] = info["abstract"] #[0,200] + "..."
                end

                kmap_results.push(hsh)

            end # results.each_with_index do |article, i|

            # Sort by category labels
            categories = categories.sort

            # Categories
            ############
            categories.each_with_index do |(labels, articles), i|
                hsh = {}
                hsh["id"] = i
                hsh["label"] = labels.join(" | ")
                color = ""
                # Color
                if labels.length > 1
                    c1 = Kmapper.get_color(labels.first)
                    c2 = Kmapper.get_color(labels.last)
                    gradient = Gradient.new(colors: [c1.first.color,c2.first.color], steps: 3)
                    color = gradient.middle
                else
                    if labels[0] != "Unknown"
                        c1 = Kmapper.get_color(labels[0])
                        color = c1.first.color
                    else
                        color = "#000000"
                    end
                end
                hsh["color"] = color
                hsh["radius"] = (articles.last)/page_size
                # Pages and articles per category
                article_hsh = {}
                articles.each do |a|
                    page = a/page_size
                    if article_hsh[page] != nil
                        article_hsh[page] = article_hsh[page].push(a)
                    else
                        article_hsh[page] = [a]
                    end
                end
                article_hsh = article_hsh.sort

                ary = []
                article_hsh.each do |key,value|
                    this_hsh = {}
                    this_hsh["page"] = key
                    this_hsh["article_ids"] = value
                    ary.push(this_hsh)
                end

                hsh["pages"] = ary

                kmap_categories.push(hsh)

                # Articles
                ##########
                # Finish article objects by adding the unique category_id to each article
                articles.each do |a|
                    # Iterate over the article indices
                    kmap_results[a]["category_id"] = i
                end
            end # categories.each_with_index do |(labels, articles), i|

            ###################
            # Create final kmap
            ###################

            kmap = {}
            kmap["timestamp"] = kmap_timestamp
            kmap["query"] = kmap_query
            kmap["nr_of_articles"] = kmap_nr_of_articles
            kmap["page_size"] = page_size
            kmap["categories"] = kmap_categories
            kmap["articles"] = kmap_results

            @kmap = JSON.pretty_generate(kmap)
        else
            @kmap = "Couldn't access the DOAJ search, sorry"
        end
    end
end
