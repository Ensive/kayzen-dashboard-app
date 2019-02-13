class CreateCampaigns < ActiveRecord::Migration[5.2]
  def change
    create_table :campaigns do |t|
      t.references :advertiser, :foreign_key => true, :index => true
      t.string :name
      t.date :start_date
      t.date :end_date
      t.string :cost_model
      t.float :cost

      # t.timestamps
    end
  end
end
