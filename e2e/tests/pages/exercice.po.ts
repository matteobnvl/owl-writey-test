import { BasePo } from "./base.po";
import { expect, Locator, Page } from '@playwright/test';

export class ExercicePo extends BasePo {
    constructor(page: Page) {
        super(page);
    }

    async goTo(): Promise<void> {
        await this.page.goto('/dashboard');
    }

    async goToNewExercice(): Promise<void> {
        await this.page.locator('button[routerlink="/exercises/new"]').click({ trial: false });
    }

    async elementExercice(name: string): Promise<Locator> {
        return await this.page.locator('owl-dashboard-exercise-card').filter({ hasText: name }).first();
    }

    get dashboardHeading(): Locator {
        return this.page.getByRole('heading', { level: 1, name: 'Mes Romans' });
    }

    get newExerciceHeading(): Locator {
        return this.page.getByRole('heading', { level: 1, name: 'Nouvel exercice' });
    }

    get shareDialog(): Locator {
        return this.page.locator('div.share-dialog__link--input input[type="text"]');
    }

    get closeButton(): Locator {
        return this.page.getByRole('button', { name: 'Fermer' });
    }

    get userMenu(): Locator {
        return this.page.locator('.header__username');
    }

    get logoutMenuItem(): Locator {
        return this.page.getByRole('menuitem', { name: 'Déconnexion' });
    }

    async createExercice(title: string = 'Test e2e'): Promise<void> {
        await this.page.getByRole('textbox', { name: 'Titre' }).fill(title);
        await this.page.getByRole('spinbutton', { name: 'Nombre de tours' }).fill('10');
        await this.page.getByRole('combobox', { name: "Durée d'un tour" }).click();
        await this.page.getByRole('option', { name: '1 jour' }).click();
        await this.page.getByRole('spinbutton', { name: 'Minimum de mots' }).fill('10');
        await this.page.getByRole('spinbutton', { name: 'Maximum de mots' }).fill('30');
        await this.page.getByRole('textbox', { name: 'Écrivez le début de votre histoire :' }).fill('Le mec parle trop fort là');
        await this.page.getByRole('button', { name: 'Valider'}).click({ trial: false });
    }

    async createFullExerciceFlow(title: string = 'Test e2e'): Promise<void> {
        await this.goToNewExercice();
        await expect(this.newExerciceHeading).toBeVisible();
        await this.createExercice(title);
    }

    async playExercice(exerciceName: string = 'Test e2e'): Promise<void> {
        const element = this.page.locator('owl-dashboard-exercise-card').filter({ hasText: exerciceName }).first();
        await element.locator('a:has(mat-icon:text("play_arrow"))').click({ trial: false });
    }

    async shareExercice(): Promise<string> {
        await this.page.locator('a:has(mat-icon:text("link"))').click({ trial: false });
        const link = await this.shareDialog.inputValue();
        return link;
    }

    async participateInExercice(text: string): Promise<void> {
        await this.page.getByRole('button', { name: ' À mon tour !' }).click({ trial: false });
        await this.page.locator('.NgxEditor__Content').fill(text);
        await this.page.getByRole('button', { name: 'Soumettre' }).click({ trial: false });
    }

    async verifyParticipationText(text: string): Promise<void> {
        await expect(this.page.locator('owl-exquisite-corpse-details').filter({ hasText: text })).toBeVisible();
    }

    async handleDeleteButton(name: string = 'Test e2e'): Promise<Locator> {
        const elementExercice = await this.elementExercice(name);
        await expect(elementExercice).toBeVisible();
        await elementExercice
            .locator('a[href*="/exercises/"] >> mat-icon:text("play_arrow")')
            .click();
        await this.page.locator('a:has(mat-icon:text("delete"))').click();
        await this.page.getByRole('button').filter({ hasText: 'Oui' }).click();
        return elementExercice;
    }

    async handleFinishButton(): Promise<void> {
        await this.page
            .locator('a >> mat-icon:text("check_box")')
            .click();
        await this.page.getByRole('button').filter({ hasText: 'Oui' }).click();
    }

    async logout(): Promise<void> {
        await this.userMenu.click({ trial: false });
        await this.logoutMenuItem.click({ trial: false });
    }

    async verifyDashboard(): Promise<void> {
        await expect(this.dashboardHeading).toBeVisible();
    }

    async verifyExerciceTitle(title: string): Promise<void> {
        await expect(this.page.getByRole('heading', { level: 1, name: title })).toBeVisible();
    }

    async verifyExerciceNotVisible(exerciceName: string): Promise<void> {
        await expect(this.page.locator('owl-dashboard-exercise-card').filter({ hasText: exerciceName })).not.toBeVisible();
    }

    async verifyShareLink(link: string): Promise<void> {
        expect(link).toContain('https://owl-writey.hemit.fr/exercises/');
    }
}