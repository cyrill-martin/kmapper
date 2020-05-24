class Lcc < ApplicationRecord
	belongs_to :kmapper

    def self.find_kmapper(code, boolean)
    	self.joins(:kmapper).select("kmappers.label")
    	.where("lccs.code = (?) AND lccs.subclass = (?)", code, boolean)
    end

end
