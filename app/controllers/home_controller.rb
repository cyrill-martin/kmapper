class HomeController < ApplicationController
  def home

  	@show_about = true

    set_meta_tags(
        title: "The knowledge mapper",
        description: "Tackling complex real-world problems needs interdisciplinary research and an open and easy to navigate knowledge landscape. kmapper is the knowledge mapper.",
        image: request.base_url + "/kmapper_k_social.png",
        keywords: "reasearch, interdisciplinarity, search, visualization",
        url: request.original_url,
        noindex: true,
        nofollow: true,
        twitter: {
        	title: :title,
            description: :description,
            image: request.base_url + "/kmapper_k_social.png",
            card: "summary_large_image",
            creator: "@cyrill_martin",
            site: "@cyrill_martin"
        },
        og: {
        	site_name: "kmapper",
        	title: :title,
            description: :description,
        	image: request.base_url + "/kmapper_k_social.png",
            url: request.original_url,
            type: "website"
        }
    )

  end
end
