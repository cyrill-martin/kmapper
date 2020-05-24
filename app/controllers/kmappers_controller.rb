class KmappersController < ApplicationController
  before_action :set_kmapper, only: [:show, :edit, :update, :destroy]

  # GET /kmappers
  # GET /kmappers.json
  def index
    @kmappers = Kmapper.all
  end

  # GET /kmappers/1
  # GET /kmappers/1.json
  def show
  end

  # GET /kmappers/new
  def new
    @kmapper = Kmapper.new
  end

  # GET /kmappers/1/edit
  def edit
  end

  # POST /kmappers
  # POST /kmappers.json
  def create
    @kmapper = Kmapper.new(kmapper_params)

    respond_to do |format|
      if @kmapper.save
        format.html { redirect_to @kmapper, notice: 'Kmapper was successfully created.' }
        format.json { render :show, status: :created, location: @kmapper }
      else
        format.html { render :new }
        format.json { render json: @kmapper.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /kmappers/1
  # PATCH/PUT /kmappers/1.json
  def update
    respond_to do |format|
      if @kmapper.update(kmapper_params)
        format.html { redirect_to @kmapper, notice: 'Kmapper was successfully updated.' }
        format.json { render :show, status: :ok, location: @kmapper }
      else
        format.html { render :edit }
        format.json { render json: @kmapper.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /kmappers/1
  # DELETE /kmappers/1.json
  def destroy
    @kmapper.destroy
    respond_to do |format|
      format.html { redirect_to kmappers_url, notice: 'Kmapper was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_kmapper
      @kmapper = Kmapper.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def kmapper_params
      params.require(:kmapper).permit(:label, :color)
    end
end
