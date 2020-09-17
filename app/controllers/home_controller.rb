class HomeController < ApplicationController
  def home

  	@show_about = true

    set_meta_tags(
        title: "The knowledge mapper",
        description: "Visualize your subject in an interdisciplinary context",
        image: request.base_url + "/kmapper_k_social.png",
        keywords: "reasearch, interdisciplinarity, search, visualization",
        url: request.original_url,
        noindex: true,
        nofollow: true,
        twitter: {
        	title: :title,
            description: :description,
            image: :image,
            card: "summary_large_image",
            creator: "@cyrill_martin",
            site: "@cyrill_martin"
        },
        og: {
        	site_name: "kmapper",
        	title: :title,
            description: :description,
        	image: :image,
            url: :url,
            type: "website"
        }
    )

  end
end
