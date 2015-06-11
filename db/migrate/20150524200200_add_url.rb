class AddUrl < ActiveRecord::Migration
  def change
    change_table :messages do |t|
      t.rename :title, :url
    end
  end
end