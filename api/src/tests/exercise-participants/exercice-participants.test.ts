import { AbstractTest } from "../core/AbstractTest";
import { ExerciceUtils } from "../../utils/exercice.utils";
import { TestUtils } from "../../utils/test.utils";

export class ExerciceParticipantsTest extends AbstractTest {
    public exerciseId: string = "";
    public testUtils = new TestUtils();
    public exerciseUtils = new ExerciceUtils(this.testUtils);
    
    async beforeTest() {
        await this.exerciseUtils.CreateExercise('pseudo');
        const resExercise = await this.exerciseUtils.getExercises('pseudo');
        for (const exercise of resExercise.body.exercises) {
            this.exerciseId = exercise.id;
        }
    }
}

const testInstance = new ExerciceParticipantsTest();

beforeAll(async () => {
  await testInstance.beforeTest();
});

describe("Exercises Participants API", () => {
    it("should add participant into an exercise", async () => {
        const token = await testInstance.testUtils.logHas('bob');
        const res = await testInstance.post(`/exercises/${testInstance.exerciseId}/participants`, {}, token);
        expect(res.status).toBe(204);
    });

    it("should refuse to add participant without token", async () => {
        const token = await testInstance.testUtils.logHas('anonymous');
        const res = await testInstance.post(`/exercises/${testInstance.exerciseId}/participants`, {}, token);
        expect(res.status).toBe(401);
    });

    it("should not finish game if participants is not admin", async () => {
        const token = await testInstance.testUtils.logHas('bob');
        const res = await testInstance.post(`/exercises/${testInstance.exerciseId}/finish`, {}, token);
        expect(res.status).toBe(400);
    });
});