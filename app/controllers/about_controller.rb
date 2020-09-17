class AboutController < ApplicationController
  def show

  	@show_kmapper = true

    set_meta_tags(
        title: "About kmapper",
        description: "Visualize your subject in an interdisciplinary context",
        image: request.base_url + "/kmapper_k_social.png",
        url: request.original_url,
        noindex: true,
        nofollow: true,
        twitter: {
            title: :title,
            description: :description,
            image: :image,
            card: "summary",
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
