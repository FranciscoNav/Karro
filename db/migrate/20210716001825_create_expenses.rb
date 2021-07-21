class CreateExpenses < ActiveRecord::Migration[6.1]
  def change
    create_table :expenses do |t|
      t.string :name
      t.integer :cost
      t.date :date
      t.integer :user_id
      t.integer :car_id
      t.integer :category_id

      t.timestamps
    end
  end
end
