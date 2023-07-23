describe('spec', () => {
  const user = {
    username: 'isaacClarke8#',
    email: 'testemail@test.com',
    password: 'testPass5%',
    confirm: 'testPass5%',
  }

  it('will render the index page', () => {
    cy.visit('http://localhost:5173')
  })

  describe('signup', () => {
    it('can create new user account', () => {
      cy.visit('http://localhost:5173/signup').then(async () => {
        await cy.get('input[name=username]').type(user.username)
        await cy.get('input[name=email]').type(user.email)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('input[name=confirm]').type(user.confirm)
        await cy.get('#signup-btn').click()
        //
        await cy.contains(`${user.email} created`)
        await cy.url().should('be.equals', 'http://localhost:5173/login')
      })
    })
  })

  describe('login & logout', () => {
    it('can login and logout user', () => {
      cy.visit('http://localhost:5173/login').then(async () => {
        await cy.get('input[name=email]').type(user.email)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
        await cy.url().should('be.equals', 'http://localhost:5173/dashboard')
        await cy.get('#logout-btn').click()
        await cy.contains(`${user.username} logged out`)
      })
    })
  })

  describe('update user account', () => {
    it('can update user bio profile', () => {
      cy.visit('http://localhost:5173/login').then(async () => {
        await cy.get('input[name=email]').type(user.email)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
        await cy.get('#home-link').click()
        await cy.url().should('be.equals', 'http://localhost:5173/')
        await cy.get('#me-link').click()
        await cy
          .get('textarea[name=bio]')
          .type(`Hello, World! I'm ${user.username} and I am a coder.`)
        await cy.get('#update-me-btn').click()
        await cy.contains(`${user.username} profile update`)
        cy.wait(8000)
        await cy.get('#home-link').click()
        await cy.get('#logout-btn').click()
        await cy.contains(`${user.username} logged out`)
      })
    })
  })

  describe('duplicate email error', () => {
    it('it will fail to signup user entering a duplicate email', () => {
      cy.visit('http://localhost:5173/signup').then(async () => {
        await cy.get('input[name=username]').type('agentX1')
        await cy.get('input[name=email]').type(user.email)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('input[name=confirm]').type(user.confirm)
        await cy.get('#signup-btn').click()
        await cy.contains('Cannot use the email provided')
        cy.wait(7000)
      })
    })
  })

  describe('duplicate username error', () => {
    it('it will fail to signup user entering a duplicate username', () => {
      cy.visit('http://localhost:5173/signup').then(async () => {
        await cy.get('input[name=username]').type(user.username)
        await cy.get('input[name=email]').type('testemail1@test.com')
        await cy.get('input[name=password]').type(user.password)
        await cy.get('input[name=confirm]').type(user.confirm)
        await cy.get('#signup-btn').click()
        await cy.contains('Cannot use the username provided')
        cy.wait(7000)
      })
    })
  })

  describe('snippet creation', () => {
    it('can create snippet', () => {
      cy.visit('http://localhost:5173/login').then(async () => {
        await cy.get('input[name=email]').type(user.email)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
        await cy.get('#home-link').click()
        await cy.url().should('be.equals', 'http://localhost:5173/')
        await cy.get('#create-snippet-link').click()
        await cy.get('input[name=lang]').type('js')
        await cy.get('#add-tag-btn').click()
        cy.wait(500)
        await cy.get('textarea[name=title]').type('My javascript code snippet')
        await cy.get('textarea[name=description]').type('This is awesome js code.')
        await cy.get('textarea[name=entry]').type("console.log('Hello, World!')")
        cy.wait(500)
        await cy.get('#create-snippet-btn').click()
        cy.wait(2000)
        await cy.contains("console.log('Hello, World!')")
      })
    })
  })

  describe('duplicate snippet', () => {
    it('it will fail to create snippet with duplicate title', () => {
      cy.visit('http://localhost:5173/login').then(async () => {
        await cy.get('input[name=email]').type(user.email)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
        await cy.get('#home-link').click()
        await cy.url().should('be.equals', 'http://localhost:5173/')
        await cy.get('#create-snippet-link').click()
        await cy.get('input[name=lang]').type('js')
        await cy.get('#add-tag-btn').click()
        await cy.get('textarea[name=title]').type('My javascript code snippet')
        await cy.get('textarea[name=description]').type('This is awesome js code.')
        await cy.get('textarea[name=entry]').type("console.log('Hello, World!')")
        await cy.get('#create-snippet-btn').click()
        cy.wait(500)
        await cy.contains('Cannot use the title provided')
        cy.wait(7000)
      })
    })
  })

  describe('comment creation', () => {
    it('can create comments', () => {
      cy.visit('http://localhost:5173/login').then(async () => {
        await cy.get('input[name=email]').type(user.email)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
        await cy.get('#home-link').click()
        await cy.url().should('be.equals', 'http://localhost:5173/')
        await cy.get('.post-title').contains('My javascript code snippet').click()
        await cy.get('#add-comment-link').click()
        await cy.get('textarea[name=commentary]').type('This is really helpful post!')
        cy.wait(500)
        await cy.get('#create-comment-btn').click()
        await cy.contains('This is really helpful post!')
        cy.wait(8000)
        await cy.get('#home-link').click()
        await cy.get('#logout-btn').click()
        await cy.contains(`${user.username} logged out`)
      })
    })
  })

  describe('account deletion', () => {
    it('can delete user accounts including posts and comments', () => {
      cy.visit('http://localhost:5173/login').then(async () => {
        await cy.get('input[name=email]').type(user.email)
        await cy.get('input[name=password]').type(user.password)
        await cy.get('#login-btn').click()
        await cy.get('#home-link').click()
        await cy.url().should('be.equals', 'http://localhost:5173/')
        await cy.get('#me-link').click()
        cy.wait(500)
        await cy.get('#account-delete-btn').click()
      })
    })
  })

  describe('production website', () => {
    it('can view the website in https://www.arnelimperial.com', () => {
      cy.visit('https://www.arnelimperial.com')
    })
  })

  /////END
})
