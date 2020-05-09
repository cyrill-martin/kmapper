require 'test_helper'

class KmappersControllerTest < ActionDispatch::IntegrationTest
  setup do
    @kmapper = kmappers(:one)
  end

  test "should get index" do
    get kmappers_url
    assert_response :success
  end

  test "should get new" do
    get new_kmapper_url
    assert_response :success
  end

  test "should create kmapper" do
    assert_difference('Kmapper.count') do
      post kmappers_url, params: { kmapper: { color: @kmapper.color, label: @kmapper.label } }
    end

    assert_redirected_to kmapper_url(Kmapper.last)
  end

  test "should show kmapper" do
    get kmapper_url(@kmapper)
    assert_response :success
  end

  test "should get edit" do
    get edit_kmapper_url(@kmapper)
    assert_response :success
  end

  test "should update kmapper" do
    patch kmapper_url(@kmapper), params: { kmapper: { color: @kmapper.color, label: @kmapper.label } }
    assert_redirected_to kmapper_url(@kmapper)
  end

  test "should destroy kmapper" do
    assert_difference('Kmapper.count', -1) do
      delete kmapper_url(@kmapper)
    end

    assert_redirected_to kmappers_url
  end
end
