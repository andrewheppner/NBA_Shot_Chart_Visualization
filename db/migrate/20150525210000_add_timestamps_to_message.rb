class AddTimestampsToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :created_at, :timestamp
    add_column :messages, :updated_at, :timestamp
  end
end