# kmapper

## What does kmapper do?

There's no fancy topic modeling or NLP going on at kmapper. It's an organization of search results.

1. With kmapper you send a search query to the [DOAJ][DOAJ]'s article [search API][searchAPI].
2. kmapper gets a response of the top **50** articles (sorted by relevance) matching your query.
3. Based on an article's journal it has been published in, the DOAJ has already tagged each article with [LCC][LCC] classes and subclasses.
4. kmapper maps the received LCC classes to its own table of scientific disciplines and groups the search results based on relevance and scientific discipline.

## Why kmapper?

Tackling complex real-world problems needs interdisciplinary research and an open and easy to navigate knowledge landscape. kmapper is the knowledge mapper. 

By showing more than the usual top 10-15 results of a search and by also showing different scientific disciplines involved with a user's search, kmapper breaks discipline silos without changing the disciplinarity of journal publications and review processes in place. kmapper pushes for serendipity. 

## What's the license?

kmapper is licensed under the [MIT license][MIT]. 
The kmapper logos are licensed under the [CC BY-NC-ND 4.0][CC BY-NC-ND 4.0] International License.
Article metadata is provided by the Directory of Open Access Journals under the [CC BY-SA 4.0][CC BY-SA 4.0] International License.

## How to use and develop locally?

### Dependencies 

- [Ubuntu][Ubuntu] 18.04
- [Rails][Rails] 6.0.3
- [Ruby][Ruby] 2.7.1
- [PostgreSQL][PostgreSQL] 12.3
  - To use the files as they are, you want to have a PostgreSQL user "kmapper" with password "kmap18" in place.
  - Otherwise you want to change *config/database.yml* accordingly.
- [Node.js][Node] v10.21.0
- [Yarn][Yarn] 1.22.4

### Getting started

1. Clone or download the repository to your directory of choice.
1. If you haven't done it already, open up a terminal window and cd to the cloned or downloaded and unzipped repository with ``cd kmapper``.
1. Run ``bundle install`` to install the needed Ruby Gems. 
1. Run ``rake db:create`` to create the database. 
   - If this doesn't work, you might want to check whether your PostgreSQL users match the users in *config/database.yml*.
   - Additionally, it might help to do the following: 
     1. ``cd /etc/postgresql/12.3/main`` to go to your current PostgreSQL installation.
     1. ``sudo gedit pg_hba.conf`` to open up this configuration file.
     1. Make sure the one line below the following commented line in the file looks like this:
        ```
        # “local” is for Unix domain socket connections only
        local    all    all    md5
        ```
     1. ``sudo service postgresql restart`` to restart the PostgreSQL service.
1. Run ``rake db:migrate`` to create the database tables.
1. Seed the database with the files provided in *db*. 
   - You either copy the contents of *seed_kmappers.rb* to *seeds.rb*, run ``rake db:seed`` and repeat this for *seed_lccs.rb* or you write your own custom rake task to seed the two files.
1. Run ``rails server`` and go to http://localhost:3000 to see if everything is working. 


[DOAJ]: https://doaj.org
[searchAPI]: https://doaj.org/api/v1/docs#!/Search/get_api_v1_search_articles_search_query
[LCC]: https://www.loc.gov/catdir/cpso/lcco/
[MIT]: https://opensource.org/licenses/MIT
[Rails]: https://rubyonrails.org/
[Ruby]: https://www.ruby-lang.org/
[PostgreSQL]: https://www.postgresql.org/
[Ubuntu]: https://ubuntu.com/
[Docker]: https://www.docker.com/
[Node]: https://nodejs.org/
[Yarn]: https://classic.yarnpkg.com/
[CC BY-NC-ND 4.0]: https://creativecommons.org/licenses/by-nc-nd/4.0/
[CC BY-SA 4.0]: https://creativecommons.org/licenses/by-sa/4.0/