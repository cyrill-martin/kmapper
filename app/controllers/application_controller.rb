class ApplicationController < ActionController::Base
    protect_from_forgery with: :exception

    ####################
    # doaj_controller.rb
    ####################
     
    def get_doaj_issns(doaj_article)
        if doaj_article["bibjson"]["journal"]["issns"] != nil
            return doaj_article["bibjson"]["journal"]["issns"]
        else
            return nil
        end # if doaj_article["bibjson"]["journal"]["issns"] != nil
    end # def get_doaj_issns(doaj_article)

    def get_doaj_categories(doaj_article)
        if doaj_article["bibjson"]["subject"] != nil
            cats = doaj_article["bibjson"]["subject"]
            ary = []
            cats.each do |cat|
                if cat["scheme"] == "LCC"
                    ary.push(cat["code"])
                else
                    next
                end
            end # cats.each do |cat|
            if ary.any?
                return ary
            else
                return nil
            end
        else
            return nil
        end # if doaj_article["bibjson"]["subject"] != nil
  end # def get_doaj_categories(doaj_article)

end
