class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports, id: false do |t|
      t.references :advertiser, :foreign_key => true, :index => true
      t.references :campaign, :foreign_key => true, :index => true
      t.date :date
      t.bigint :impressions
      t.bigint :clicks
      t.bigint :installs
      t.bigint :cost_micros

      # t.timestamps
    end
  end
end
