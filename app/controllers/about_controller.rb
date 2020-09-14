class AboutController < ApplicationController
  def show

    set_meta_tags(
        title: "About the knowledge mapper",
        description: "Visualize your subject in an interdisciplinary context",
        keywords: "reasearch, interdisciplinarity, visualization",
        image: request.base_url + "/kmapper_k_social.png",
        noindex: true,
        nofollow: true,
        twitter: {
            site_name: "kmapper - The knowledge mapper",
            card: "summary_large_image",
            site: "@cyrill_martin",
            description: "Visualize your subject in an interdisciplinary context",
            image: request.base_url + "/kmapper_k_social.png"
        },
        og: {
            url: request.original_url,
            site_name: "kmapper",
            title: "The knowledge mapper",
            image: request.base_url + "/kmapper_k_social.png",
            description: "Visualize your subject in an interdisciplinary context",
            type: 'website'
        }
    )

  	@show_kmapper = true
  	@show_about = false
  	@show_download = false
  end
end
