class LccsController < ApplicationController
  before_action :set_lcc, only: [:show, :edit, :update, :destroy]

  # GET /lccs
  # GET /lccs.json
  def index
    @lccs = Lcc.all
  end

  # GET /lccs/1
  # GET /lccs/1.json
  def show
  end

  # GET /lccs/new
  def new
    @lcc = Lcc.new
  end

  # GET /lccs/1/edit
  def edit
  end

  # POST /lccs
  # POST /lccs.json
  def create
    @lcc = Lcc.new(lcc_params)

    respond_to do |format|
      if @lcc.save
        format.html { redirect_to @lcc, notice: 'Lcc was successfully created.' }
        format.json { render :show, status: :created, location: @lcc }
      else
        format.html { render :new }
        format.json { render json: @lcc.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /lccs/1
  # PATCH/PUT /lccs/1.json
  def update
    respond_to do |format|
      if @lcc.update(lcc_params)
        format.html { redirect_to @lcc, notice: 'Lcc was successfully updated.' }
        format.json { render :show, status: :ok, location: @lcc }
      else
        format.html { render :edit }
        format.json { render json: @lcc.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /lccs/1
  # DELETE /lccs/1.json
  def destroy
    @lcc.destroy
    respond_to do |format|
      format.html { redirect_to lccs_url, notice: 'Lcc was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_lcc
      @lcc = Lcc.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def lcc_params
      params.require(:lcc).permit(:code, :label, :subclass, :kmapper_id)
    end
end
