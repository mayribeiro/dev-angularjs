/**
 * Created by mayco on 02/05/2017.
 */
/**
 * Mock com escopo global
 */
describe('ItemCtrl with global mock', function () {

    var ctrl;

    beforeEach(module('notesApp1'));
    beforeEach(module('notesApp1Mocks'));

    beforeEach(inject(function ($controller) {
        ctrl = $controller('ItemCtrl');
    }));

    it('should load mocked out items', function () {
       expect(ctrl.items).toEqual([{id: 1, label: 'Mock'}]);
    });

});