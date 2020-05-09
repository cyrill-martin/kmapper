require 'test_helper'

class LccsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @lcc = lccs(:one)
  end

  test "should get index" do
    get lccs_url
    assert_response :success
  end

  test "should get new" do
    get new_lcc_url
    assert_response :success
  end

  test "should create lcc" do
    assert_difference('Lcc.count') do
      post lccs_url, params: { lcc: { code: @lcc.code, kmapper_id: @lcc.kmapper_id, label: @lcc.label, subclass: @lcc.subclass } }
    end

    assert_redirected_to lcc_url(Lcc.last)
  end

  test "should show lcc" do
    get lcc_url(@lcc)
    assert_response :success
  end

  test "should get edit" do
    get edit_lcc_url(@lcc)
    assert_response :success
  end

  test "should update lcc" do
    patch lcc_url(@lcc), params: { lcc: { code: @lcc.code, kmapper_id: @lcc.kmapper_id, label: @lcc.label, subclass: @lcc.subclass } }
    assert_redirected_to lcc_url(@lcc)
  end

  test "should destroy lcc" do
    assert_difference('Lcc.count', -1) do
      delete lcc_url(@lcc)
    end

    assert_redirected_to lccs_url
  end
end
