# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_02_11_140753) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "advertisers", force: :cascade do |t|
    t.string "name"
  end

  create_table "campaigns", force: :cascade do |t|
    t.bigint "advertiser_id"
    t.string "name"
    t.date "start_date"
    t.date "end_date"
    t.string "cost_model"
    t.float "cost"
    t.index ["advertiser_id"], name: "index_campaigns_on_advertiser_id"
  end

  create_table "reports", id: false, force: :cascade do |t|
    t.bigint "advertiser_id"
    t.bigint "campaign_id"
    t.date "date"
    t.bigint "impressions"
    t.bigint "clicks"
    t.bigint "installs"
    t.bigint "cost_micros"
    t.index ["advertiser_id"], name: "index_reports_on_advertiser_id"
    t.index ["campaign_id"], name: "index_reports_on_campaign_id"
  end

  add_foreign_key "campaigns", "advertisers"
  add_foreign_key "reports", "advertisers"
  add_foreign_key "reports", "campaigns"
end
