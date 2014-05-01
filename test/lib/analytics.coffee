rewire = require 'rewire'
rewiredAnalytics = rewire '../../lib/analytics'
analytics = require '../../lib/analytics'
Artwork = require '../../models/artwork'
sinon = require 'sinon'
sd = require('sharify').data

describe 'analytics', ->

  describe 'with a standard useragent', ->

    before ->
      sinon.stub(analytics, 'getUserAgent').returns "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/32.0.1700.102 Safari/537.36"

    after ->
      analytics.getUserAgent.restore()

    beforeEach ->
      sd.MIXPANEL_ID = 'mix that panel'
      sd.GOOGLE_ANALYTICS_ID = 'goog that analytics'
      @mixpanelStub = {}
      @mixpanelStub.track = sinon.stub()
      @mixpanelStub.register = sinon.stub()
      @mixpanelStub.init = sinon.stub()

      @gaStub = sinon.stub()
      analytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }

    describe 'initialize function', ->

      it 'inits ga with the GOOGLE_ANALYTICS_ID', ->
        @gaStub.args[0][0].should.equal 'create'
        @gaStub.args[0][1].should.equal 'goog that analytics'

    describe '#trackPageview', ->

      it 'sends a google pageview', ->
        analytics.trackPageview()
        @gaStub.args[1][0].should.equal 'send'
        @gaStub.args[1][1].should.equal 'pageview'

      it 'doesnt let failed analytics mess up js code', ->
        analytics mixpanel: null, ga: null, location: { pathname: 'foobar' }
        analytics.trackPageview()

    describe '#modelNameAndIdToLabel', ->

      it 'capitalizes modelname', ->
        analytics.modelNameAndIdToLabel('modelname', 123).should.equal 'Modelname:123'

      it 'errors without modelName or id', ->
        (()-> analytics.modelNameAndIdToLabel()).should.throw()

    describe '#encodeMulti', ->

      it "encodes ids into hex values", ->
        analytics.encodeMulti(['andy', 'warhol']).should.equal 'da41bcef-5ef1fd34'

      it "encodes one id into hex value", ->
        analytics.encodeMulti(['andy']).should.equal 'da41bcef'

    context 'with rewiredAnalytics', ->

      beforeEach ->
        rewiredAnalytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }
        rewiredAnalytics.__set__ 'ga', @gaStub
        rewiredAnalytics.__set__ 'mixpanel', @mixpanelStub

      describe '#track', ->

        it 'Does not track admins', ->
          model = new Artwork(id: '123')
          sd.CURRENT_USER = { type: 'Admin' }
          rewiredAnalytics.track.click 'Did something', { label: rewiredAnalytics.modelNameAndIdToLabel('artwork', model.get('id')) }
          @gaStub.args.length.should.equal 2

        it 'Tracks normal users', ->
          model = new Artwork(id: '123')
          sd.CURRENT_USER = { type: 'User' }
          rewiredAnalytics.track.click 'Did something', { label: rewiredAnalytics.modelNameAndIdToLabel('artwork', model.get('id')) }
          @gaStub.args.length.should.equal 3

        it 'Tracks logged out users', ->
          model = new Artwork(id: '123')
          sd.CURRENT_USER = null
          rewiredAnalytics.track.click 'Did something', { label: rewiredAnalytics.modelNameAndIdToLabel('artwork', model.get('id')) }
          @gaStub.args.length.should.equal 3

        it 'sends tracking info to both ga and mixpanel', ->
          model = new Artwork(id: '123')
          rewiredAnalytics.track.click 'Did something', { label: rewiredAnalytics.modelNameAndIdToLabel('artwork', model.get('id')) }

          @gaStub.args[2][0].should.equal 'send'
          @gaStub.args[2][1].hitType.should.equal 'event'
          @gaStub.args[2][1].eventCategory.should.equal 'UI Interactions'
          @gaStub.args[2][1].eventAction.should.equal 'Did something'
          @gaStub.args[2][1].nonInteraction.should.equal 0

          @mixpanelStub.track.args[0][0].should.equal 'Did something'
          @mixpanelStub.track.args[0][1].label.should.equal 'Artwork:123'

        it 'sends funnel tracking info to both ga and mixpanel', ->
          model = new Artwork(id: '123')
          rewiredAnalytics.track.funnel 'Did something', { label: 'cool label' }

          @gaStub.args[2][0].should.equal 'send'
          @gaStub.args[2][1].hitType.should.equal 'event'
          @gaStub.args[2][1].eventCategory.should.equal 'Funnel Progressions'
          @gaStub.args[2][1].eventAction.should.equal 'Did something'
          @gaStub.args[2][1].nonInteraction.should.equal 1

          @mixpanelStub.track.args[0][0].should.equal 'Did something'
          @mixpanelStub.track.args[0][1].label.should.equal 'cool label'

      describe '#registerCurrentUser', ->

        it 'Does not track admins', ->
          sd.CURRENT_USER = { type: 'Admin' }
          rewiredAnalytics.registerCurrentUser()
          @mixpanelStub.register.args.length.should.equal 0

        it 'Tracks normal users', ->
          sd.CURRENT_USER = { type: 'User' }
          rewiredAnalytics.registerCurrentUser()
          @mixpanelStub.register.args.length.should.equal 1
          @mixpanelStub.register.args[0][0]['User Type'].should.equal 'Logged In'

        it 'Tracks logged out users', ->
          sd.CURRENT_USER = null
          rewiredAnalytics.registerCurrentUser()
          @mixpanelStub.register.args.length.should.equal 1
          @mixpanelStub.register.args[0][0]['User Type'].should.equal 'Logged Out'


      describe '#multi', ->

        it 'sets the object ID to the concatenation of shortened MD5 hashes', (done) ->
          rewiredAnalytics.multi "Did something", "Artwork", [ "thug-slug", "pug-slug" ]
          setTimeout =>
            @gaStub.args[2][0].should.equal 'send'
            @gaStub.args[2][1].should.equal 'event'
            @gaStub.args[2][2].should.equal 'Multi-object Events'
            @gaStub.args[2][3].should.equal 'Did something'
            @gaStub.args[2][4].should.equal 'Artwork:cb7a5c6f-ab197545'
            done()
          , 1000

    describe '#track', ->

      it 'returns true if enabled', ->
        rewiredAnalytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }
        rewiredAnalytics.getProperty = -> 'enabled'
        rewiredAnalytics.__set__ 'sd', { ENABLE_AB_TEST: true }
        rewiredAnalytics.abTest('foo').should.be.ok

      it 'returns false if disabled', ->
        rewiredAnalytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }
        rewiredAnalytics.getProperty = -> 'disabled'
        rewiredAnalytics.__set__ 'sd', { ENABLE_AB_TEST: true }
        rewiredAnalytics.abTest('foo').should.not.be.ok

      it 'returns false if ab test is not enabled', ->
        rewiredAnalytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }
        rewiredAnalytics.__set__ 'sd', { ENABLE_AB_TEST: false }
        rewiredAnalytics.abTest('foo').should.not.be.ok

    describe '#delta', ->
      it 'appends a tracker pixel', ->
        sd.DELTA_HOST = 'testhost'
        url = "https://" + sd.DELTA_HOST + "/?id=test_id&fair=test_fair&name=test_event&method=import&pixel=1"
        el = {}
        el.append = sinon.stub()
        data = { id: 'test_id', fair: 'test_fair' }
        analytics.delta('test_event', data, el)
        el.append.called.should.be.ok
        el.append.args[0][0].should.equal '<img src="' + url + '" style="display:none;" />'

  describe 'with a phantomjs useragent', ->

    before ->
      sinon.stub(analytics, 'getUserAgent').returns "PhantomJS"

    after ->
      analytics.getUserAgent.restore()

    beforeEach ->
      sd.MIXPANEL_ID = 'mix that panel'
      sd.GOOGLE_ANALYTICS_ID = 'goog that analytics'
      @mixpanelStub = {}
      @mixpanelStub.track = sinon.stub()

      @mixpanelStub.init = sinon.stub()
      @gaStub = sinon.stub()
      analytics mixpanel: @mixpanelStub, ga: @gaStub, location: { pathname: 'foobar' }

    describe 'initialize function', ->

      it 'doesnt init mixpanel with the MIXPANEL_ID', ->
        @mixpanelStub.init.args.length.should.equal 0

      it 'doesnt init ga with the GOOGLE_ANALYTICS_ID', ->
        @gaStub.args.length.should.equal 0
        @gaStub.args.length.should.equal 0

    describe '#trackPageview', ->

      it 'doesnt track pageviews', ->
        analytics.trackPageview()
        @gaStub.args.length.should.equal 0
        @gaStub.args.length.should.equal 0

      it 'doesnt let failed analytics mess up js code', ->
        analytics mixpanel: null, ga: null, location: { pathname: 'foobar' }
        analytics.trackPageview()
