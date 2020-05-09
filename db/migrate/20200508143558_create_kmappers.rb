class CreateKmappers < ActiveRecord::Migration[6.0]
  def change
    create_table :kmappers do |t|
      t.string :label
      t.string :color

      t.timestamps
    end
  end
end
