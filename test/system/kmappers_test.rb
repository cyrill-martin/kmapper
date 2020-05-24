require "application_system_test_case"

class KmappersTest < ApplicationSystemTestCase
  setup do
    @kmapper = kmappers(:one)
  end

  test "visiting the index" do
    visit kmappers_url
    assert_selector "h1", text: "Kmappers"
  end

  test "creating a Kmapper" do
    visit kmappers_url
    click_on "New Kmapper"

    fill_in "Color", with: @kmapper.color
    fill_in "Label", with: @kmapper.label
    click_on "Create Kmapper"

    assert_text "Kmapper was successfully created"
    click_on "Back"
  end

  test "updating a Kmapper" do
    visit kmappers_url
    click_on "Edit", match: :first

    fill_in "Color", with: @kmapper.color
    fill_in "Label", with: @kmapper.label
    click_on "Update Kmapper"

    assert_text "Kmapper was successfully updated"
    click_on "Back"
  end

  test "destroying a Kmapper" do
    visit kmappers_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Kmapper was successfully destroyed"
  end
end
