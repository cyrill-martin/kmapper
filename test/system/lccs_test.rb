require "application_system_test_case"

class LccsTest < ApplicationSystemTestCase
  setup do
    @lcc = lccs(:one)
  end

  test "visiting the index" do
    visit lccs_url
    assert_selector "h1", text: "Lccs"
  end

  test "creating a Lcc" do
    visit lccs_url
    click_on "New Lcc"

    fill_in "Code", with: @lcc.code
    fill_in "Kmapper", with: @lcc.kmapper_id
    fill_in "Label", with: @lcc.label
    check "Subclass" if @lcc.subclass
    click_on "Create Lcc"

    assert_text "Lcc was successfully created"
    click_on "Back"
  end

  test "updating a Lcc" do
    visit lccs_url
    click_on "Edit", match: :first

    fill_in "Code", with: @lcc.code
    fill_in "Kmapper", with: @lcc.kmapper_id
    fill_in "Label", with: @lcc.label
    check "Subclass" if @lcc.subclass
    click_on "Update Lcc"

    assert_text "Lcc was successfully updated"
    click_on "Back"
  end

  test "destroying a Lcc" do
    visit lccs_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Lcc was successfully destroyed"
  end
end
