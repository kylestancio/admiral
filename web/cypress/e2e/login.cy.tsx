describe("Login", ()=>{
  beforeEach(()=>{
    cy.visit("http://localhost:3000")
  })

  it("Redirects the user to the login page", ()=>{
    cy.url().should("be.equal", "http://localhost:3000/api/auth/signin?callbackUrl=%2F")
  })

  it("Let the user login if credentials are correct", ()=>{
    cy.fixture("credentials").then(credential=>{
      cy.get("input[name='username']").type(credential.username)
      cy.get("input[name='password']").type(credential.password)
      cy.get("button[type='submit']").click()
      cy.url().should("be.equal", "http://localhost:3000/")
    })
  })

  it ("Does not let the user login if credentials are incorrect", ()=>{
    cy.get("input[name='username']").type("incorrect")
    cy.get("input[name='password']").type("incorrect")
    cy.get("button[type='submit']").click()
    cy.url().should("not.be.equal", "http://localhost:3000/")
  })
})