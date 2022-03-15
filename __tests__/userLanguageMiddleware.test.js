const userLanguageMiddleware = require('../lib/index')

const response = null

const mockRequest = (lang) => {
  const req = {
    headers: {
      'accept-language': lang
    }
  }

  return req
}

const testLanguageCombination = (acceptanceHeaderLang, expectedUserLang, done) => {
  const req = mockRequest(acceptanceHeaderLang)
  userLanguageMiddleware({
    defautlLang: 'en',
    availableLangs: ['en', 'es', 'fr']
  })(req, response, (args) => {
    // No errors are expected in this middleware
    expect(args).toEqual(undefined)
    // Should check the language populated in the req object
    expect(req.userLang).toEqual(expectedUserLang)
    // Should end the tests
    done()
  })
}

const asyncController = (totalCallsExpected, finallCallback) => {
  let currentCalls = 0
  return () => {
    currentCalls++
    if (currentCalls === totalCallsExpected) {
      finallCallback()
    }
  }
}

describe('getUserLang middleware', () => {
  // Behaviour
  it('Should add EN as user language if the accept-language is not defined', done => {
    testLanguageCombination(null, 'en', done)
  })

  it('Should add EN as user language if the accept-language is not in the scope (case: single acceptance)', done => {
    const callCompleted = asyncController(2, done)
    testLanguageCombination('it', 'en', callCompleted)
    testLanguageCombination('IT-it', 'en', callCompleted)
  })

  it('Should add EN as user language if the accept-language is not in the scope (case: multiple acceptance)', done => {
    const callCompleted = asyncController(3, done)
    testLanguageCombination('it,ru', 'en', callCompleted)
    testLanguageCombination('IT,RU', 'en', callCompleted)
    testLanguageCombination('IT-it,RU-ru', 'en', callCompleted)
  })

  it('Should add AN AVAILABLE LANG as user language in the accept-language is including one (case: single acceptance)', done => {
    const callCompleted = asyncController(3, done)
    testLanguageCombination('fr', 'fr', callCompleted)
    testLanguageCombination('FR', 'fr', callCompleted)
    testLanguageCombination('FR-fr', 'fr', callCompleted)
  })

  it('Should add AN AVAILABLE LANG as user language in the accept-language is including one (case: multiple acceptance)', done => {
    const callCompleted = asyncController(3, done)
    testLanguageCombination('it,fr', 'fr', callCompleted)
    testLanguageCombination('IT,FR', 'fr', callCompleted)
    testLanguageCombination('IT-it,FR-fr', 'fr', callCompleted)
  })

  it('Should add THE FIRST AVAILABLE LANG as user language in the accept-language is including several compatible', done => {
    const callCompleted = asyncController(3, done)
    testLanguageCombination('fr,es', 'fr', callCompleted)
    testLanguageCombination('FR,ES', 'fr', callCompleted)
    testLanguageCombination('FR-fr,ES-es', 'fr', callCompleted)
  })
})
