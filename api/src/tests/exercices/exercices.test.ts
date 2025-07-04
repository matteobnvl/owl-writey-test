import { ExerciceUtils } from "../../utils/exercice.utils";
import { TestUtils } from "../../utils/test.utils";
import { AbstractTest } from "../core/AbstractTest";

export class ExercisesTest extends AbstractTest {
  private exerciseId: string = ""
  private testUtils = new TestUtils()
  private exerciseUtils = new ExerciceUtils(this.testUtils)

  async run() {
    describe("Exercises API", () => {

      it("should refuse access to exercises without token", async () => {
        const res = await this.get("/exercises")
        expect(res.status).toBe(401);
      })

      it("should create an exercise", async () => {
        const res = await this.exerciseUtils.CreateExercise('pseudo')
        expect(res.status).toBe(201);
      })

      it("should refuse to create an exercise without token", async () => {
        const res = await this.exerciseUtils.CreateExercise('anonymous')
        expect(res.status).toBe(401);
      });

      it("should get exercises with token", async () => {
        const res = await this.exerciseUtils.getExercises('pseudo');
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty("exercises");
        expect(Array.isArray(res.body.exercises)).toBe(true);
        expect(res.body.exercises.length).toBeGreaterThan(0);
        for (const exercise of res.body.exercises) {
          this.exerciseId = exercise.id;
          expect(exercise).toEqual(
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
          status: expect.any(String),
          type: expect.any(String),
          _links: expect.objectContaining({
            self: expect.any(String),
          }),
        })
          );
        }
      });

      it("should refuse to get exercise by id without token", async () => {
        const res = await this.get(`/exercises/${this.exerciseId}`);
        expect(res.status).toBe(401);
      });

      it("should get exercise by id with token", async () => {
        const res = await this.exerciseUtils.getExerciseById('pseudo', this.exerciseId);
        expect(res.status).toBe(200)
        expect(res.body).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
            status: expect.any(String),
            type: expect.any(String),
            config: expect.any(Object),
            content: expect.any(Object),
            participants: expect.any(Array),
            _links: expect.any(Object),
          })
        );
      });

      it("should refuse to delete exercise without token", async () => {
        const res = await this.delete(`/exercises/${this.exerciseId}`);
        expect(res.status).toBe(401);
      });

      it("should delete exercise with token", async () => {
        const res = await this.exerciseUtils.deleteExercise('pseudo', this.exerciseId);
        expect(res.status).toBe(204);
      });
    })
  }
}

new ExercisesTest().run();