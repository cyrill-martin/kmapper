class Kmapper < ApplicationRecord
	has_many :lccs

	def self.get_color(label)
		select(:color).where("label = (?)", label)
	end
	
end
