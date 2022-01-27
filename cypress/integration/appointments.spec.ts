describe('Appointment page - technical Test', () => {
  before(() => {
    cy.intercept('GET', '/api/patients', {
      fixture: 'intercept/interceptFixturePat.json',
    }).as('patientsList');
    cy.intercept('GET', `/api/practitioners`, {
      fixture: 'intercept/intercepFixturePract.json',
    }).as('practitionersList');
    cy.intercept('GET', `/api/availabilities?practitionerId=92`, {
      fixture: 'intercept/intercepFixturePractId.json',
    }).as('practitionerId');
  });
  it('should display all the element of the form', () => {
    cy.visit('http://localhost:3000/technicalTest').then(() => {
      cy.get(`[data-testid="patientSelect"]`, {
        timeout: 22000,
      })
        .children('select')
        .select('Eino Torp')
        .should('be.visible');
      cy.get(`[data-testid="practitionerSelect"]`, {
        timeout: 22000,
      })
        .children('label')
        .children('select')
        .select('Kaylie Mertz - Médecin Généraliste')
        .should('be.visible');
      cy.get(`[data-testid="availabilitiesAsap"]`, {
        timeout: 22000,
      })
        .click()
        .should('be.visible');
      cy.get(`[data-testid="availabilitiesSelect"]`).should('be.visible');

      cy.get(`[data-testid="availabilitiesDatePicker"]`).should('be.visible');
      cy.get(`[data-testid="availabilitiesHourSelect"]`)
        .children('label')
        .children('select')
        .select(
          '{"startDate":"2022-09-19T22:30:00.000Z","endDate":"2022-09-19T22:45:00.000Z"}',
        )
        .should('be.visible');

      cy.get(`[data-testid="submitForm"]`).should('be.visible');
    });
  });

  it('should display all the element of an Appointment', () => {
    cy.intercept('GET', `/api/appointments`, {
      fixture: 'intercept/appointments.json',
    }).as('appointmentsList');

    cy.get(`[data-testid="appointmentList"]`).should('be.visible');
    cy.get(`[data-testid="appointmentListPractName"]`).should('be.visible');
    cy.get(`[data-testid="appointmentListPractSpe"]`).should('be.visible');
    cy.get(`[data-testid="appointmentListDate"]`).should('be.visible');
    cy.get(`[data-testid="appointmentListHours"]`).should('be.visible');
    cy.get(`[data-testid="appointmentListPatientName"]`).should('be.visible');
  });
});
