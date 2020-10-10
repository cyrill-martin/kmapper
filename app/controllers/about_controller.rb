class AboutController < ApplicationController
  def show

  	@show_kmapper = true

    set_meta_tags(
        title: "About the knowledge mapper",
        description: "kmapper breaks discipline silos without changing the disciplinarity of journal publications and review processes in place. kmapper pushes for serendipity.",
        image: request.base_url + "/kmapper_k_social.png",
        url: request.original_url,
        index: true,
        follow: true,
        twitter: {
            title: :title,
            description: :description,
            image: request.base_url + "/kmapper_k_social.png",
            card: "summary",
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
