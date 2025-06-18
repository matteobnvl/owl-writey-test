import { BasePo } from "./base.po";
import { expect, Locator, Page } from '@playwright/test';

export class ExercicePo extends BasePo {
    constructor(page: Page) {
        super(page);
    }
    async goTo(): Promise<void> {
        await this.page.goto('/dashboard');
    }

    async elementExercice(): Promise<Locator> {
        return await this.page.locator('owl-dashboard-exercise-card').filter({ hasText: 'Test e2e' });
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

    async handleDeleteButton(): Promise<any> {
        const elementExercice = await this.elementExercice();
        await elementExercice.getByRole('link', { name: 'Jouer' }).click({ trial: false });
        await this.page.getByTitle('Supprimer').click({ trial: false });
        await this.page.getByRole('button').filter({ hasText: 'Oui' }).click({ trial: false });

        return await elementExercice
    }
}