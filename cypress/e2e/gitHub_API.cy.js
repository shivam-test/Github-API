let validToken = 'Bearer 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';
let tokenWithoutPermission = 'Bearer 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';

describe('GitHub API Failure Cases', () => {
    it('No Token Provided - Should return 401 Unauthorized', () => {
        cy.request({
            method: 'GET',
            url: Cypress.env('url') + '/user',
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(401);
        });
    });

    it('Invalid Token Provided - Should return 401 Unauthorized', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user',
            headers: {
                Authorization: 'Bearer INVALID_TOKEN',
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(401);
        });
    });

    it('Forbidden Access (Token Without Necessary Permissions) - Should return 403 Forbidden', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user',
            headers: {
                Authorization: tokenWithoutPermission,
            },
            failOnStatusCode: false
        }).then(response => {
            expect(response.status).to.eq(403);
            // Unable to produce 403 forbidden 
            // created a token with no scope, 
            //but still when trying to hit the /user endpoint api it comes up with some public response and throws 200 success
        });
    });
});

describe('GitHub API Success Cases', () => {
    it('Get User With Valid Token - Should return 200 OK', () => {
        cy.request({
            method: 'GET',
            url: 'https://api.github.com/user',
            headers: {
                Authorization: validToken,
            },
        }).then(response => {
            expect(response.status).to.eq(200);
        });
    });

    it('Update User Bio With Valid Token - Should return 200 OK', () => {
        const newBio = "Your new bio content here.";

        cy.request({
            method: 'PATCH',
            url: 'https://api.github.com/user',
            headers: {
                Authorization: validToken,
                'Content-Type': 'application/json'
            },
            body: {
                bio: newBio
            }
        }).then(response => {
            expect(response.status).to.eq(200);
        });
    });
});
