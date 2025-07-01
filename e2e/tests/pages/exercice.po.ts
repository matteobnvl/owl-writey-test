import { BasePo } from "./base.po";
import { expect, Locator, Page } from '@playwright/test';

export class ExercicePo extends BasePo {
    constructor(page: Page) {
        super(page);
    }
    async goTo(): Promise<void> {
        await this.page.goto('/dashboard');
    }

    async elementExercice(name: string): Promise<Locator> {
        return await this.page.locator('owl-dashboard-exercise-card').filter({ hasText: name });
    }

    async createExercice() {
        await this.page.getByRole('textbox', { name: 'Titre' }).fill('Test e2e');
        await this.page.getByRole('spinbutton', { name: 'Nombre de tours' }).fill('10');
        await this.page.getByRole('combobox', { name: "Durée d'un tour" }).click();

        await this.page.getByRole('option', { name: '1 jour' }).click();
        await this.page.getByRole('spinbutton', { name: 'Minimum de mots' }).fill('10');
        await this.page.getByRole('spinbutton', { name: 'Maximum de mots' }).fill('30');
        await this.page.getByRole('textbox', { name: 'Écrivez le début de votre histoire :' }).fill('Le mec parle trop fort là');
        await this.page.getByRole('button', { name: 'Valider'}).click({ trial: false });
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
}