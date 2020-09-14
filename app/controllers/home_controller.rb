class HomeController < ApplicationController
  def home
    set_meta_tags(
        title: "The knowledge mapper",
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

  	@show_kmapper = false
  	@show_about = true
  	@show_download = false
  	@show_header_search = false
  end
end
