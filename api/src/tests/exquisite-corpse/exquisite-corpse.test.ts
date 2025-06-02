import { ExerciceUtils } from "../../utils/exercice.utils";
import { TestUtils } from "../../utils/test.utils";
import { AbstractTest } from "../core/AbstractTest";

export class ExquisiteCorpseTest extends AbstractTest {
  public exerciseId: string = "";
  private testUtils = new TestUtils();
  private exerciseUtils = new ExerciceUtils(this.testUtils);

  async beforeTest() {
    await this.exerciseUtils.CreateExercise('pseudo');
    const resExercise = await this.exerciseUtils.getExercises('pseudo');
    for (const exercise of resExercise.body.exercises) {
      this.exerciseId = exercise.id;
    }
  }
}

const testInstance = new ExquisiteCorpseTest();

beforeAll(async () => {
  await testInstance.beforeTest();
});

describe("Exercises API", () => {
  it("should refuse access to exercises without token", async () => {
      const res = await testInstance.get("/exercises");
      expect(res.status).toBe(401);
  })

  it("should take turn on exquisite-corpse", async () => {
    const token = await testInstance.logHas('pseudo');
    const res = await testInstance.post(`/exquisite-corpse/${testInstance.exerciseId}/take-turn`, {}, token);
    expect(res.status).toBe(204);
  });

  it("should submit turn on exquisite-corpse", async () => {
    const token = await testInstance.logHas('pseudo');
    const res = await testInstance.post(`/exquisite-corpse/${testInstance.exerciseId}/submit-turn`, {
      content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    }, token);
    expect(res.status).toBe(204);
  });
});