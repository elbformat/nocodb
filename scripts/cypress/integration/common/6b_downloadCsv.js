import { mainPage } from "../../support/page_objects/mainPage";
import { loginPage } from "../../support/page_objects/navigation";
import { isTestSuiteActive } from "../../support/page_objects/projectConstants";

export const genTest = (apiType, dbType) => {
    if (!isTestSuiteActive(apiType, dbType)) return;

    describe(`${apiType.toUpperCase()} Upload/ Download CSV`, () => {
        before(() => {
            // loginPage.loginAndOpenProject(type)
            cy.openTableTab("Country", 25);
            cy.screenshot("6b-before");
        });

        after(() => {
            cy.closeTableTab("Country");
            cy.screenshot("6b-after");
        });

        it("Download verification- base view, default columns", () => {
            mainPage.hideField("LastUpdate");
            const verifyCsv = (retrievedRecords) => {
                // expected output, statically configured
                let storedRecords = [
                    `Country,Country => City`,
                    `Afghanistan,Kabul`,
                    `Algeria,"Batna,Bchar,Skikda"`,
                    `American Samoa,Tafuna`,
                    `Angola,"Benguela,Namibe"`,
                ];

                for (let i = 0; i < storedRecords.length - 1; i++) {
                    cy.log(retrievedRecords[i]);
                    expect(retrievedRecords[i]).to.be.equal(storedRecords[i]);
                }
            };

            // download & verify
            mainPage.downloadAndVerifyCsv(`Country_exported_1.csv`, verifyCsv);
            mainPage.unhideField("LastUpdate");
        });
    });
};

/**
 * @copyright Copyright (c) 2021, Xgene Cloud Ltd
 *
 * @author Raju Udava <sivadstala@gmail.com>
 *
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 *
 */
