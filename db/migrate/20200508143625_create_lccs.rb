class CreateLccs < ActiveRecord::Migration[6.0]
  def change
    create_table :lccs do |t|
      t.string :code
      t.string :label
      t.boolean :subclass
      t.integer :kmapper_id

      t.timestamps
    end
  end
end
