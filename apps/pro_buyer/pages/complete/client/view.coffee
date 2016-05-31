Promise = require 'bluebird-q'
{ invoke, pick } = require 'underscore'
{ View, Model } = require 'backbone'
Form = require '../../../../../components/form/index.coffee'
LocationSearchView = require '../../../../../components/location_search/index.coffee'
templates =
  page: -> require('../templates/page.jade') arguments...
  profession: -> require('../templates/profession.jade') arguments...

module.exports = class ProfessionalBuyerCompleteView extends View
  events:
    'change .js-profession select': 'setProfession'
    'click button': 'submit'

  initialize: ({ @user }) ->
    @listenTo @user, 'change:profession', @renderProfession

  setProfession: (e) ->
    @user.set 'profession', $(e.currentTarget).val()

  renderProfession: ->
    @$('.js-profession')
      .html templates.profession user: @user

  submit: (e) ->
    e.preventDefault()

    form = new Form $form: @$('form')
    return unless form.isReady()

    form.state 'loading'

    data = form.data location: @user.related().location.toJSON()

    if data.price_range?
      [ data.price_range_min = min
        data.price_range_max = max ] = data.price_range.split ':'

    Promise
      .all [
        @user.save pick data, [
          'profession'
          'location'
          'price_range_min'
          'price_range_max'
        ]...

        @user.related().collectorProfile.save pick data, [
          'professional_buyer'
          'company_website'
          'company_name'
        ]...
      ]
      .then =>
        @user.refresh()

      .then ->
        form.state 'success'
        form.reenable()

      .catch form.error.bind form

  postRender: ->
    city = @user.related().location.toString()
    locationSearchView = new LocationSearchView autofocus: false

    @listenTo locationSearchView, 'location:update', (value) =>
      @user.setLocation value

    @$('.js-location')
      .replaceWith locationSearchView.render(city).$el

    @subViews = [
      locationSearchView
    ]

  render: ->
    @$el.html templates.page
      user: @user
    @postRender()
    this

  remove: ->
    invoke @subViews, 'remove'
    super
