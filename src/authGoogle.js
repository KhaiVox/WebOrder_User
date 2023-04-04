const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth2').Strategy

const GOOGLE_CLIENT_ID = '774738805405-rf21nn4ubasnpupkbdl7v7tkcpkaetqv.apps.googleusercontent.com'
const GOOGLE_CLIENT_SECRET = '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'

passport.use(
    new GoogleStrategy(
        {
            clientID: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            callbackURL: 'http://localhost:3002/auth/google/callback',
            passReqToCallback: true,
        },
        function (request, accessToken, refreshToken, profile, done) {
            return done(null, profile)
        },
    ),
)

passport.serializeUser(function (user, done) {
    done(null, user)
})

passport.deserializeUser(function (user, done) {
    done(null, user)
})
