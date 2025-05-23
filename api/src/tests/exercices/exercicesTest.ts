import { AbstractTest } from "../core/AbstractTest";

export class ExercisesTest extends AbstractTest {
  private exerciseId: string = "";

  async run() {
    describe("Exercises API", () => {

      it("should refuse access to exercises without token", async () => {
        const res = await this.get("/exercises");
        expect(res.status).toBe(401);
      })

      it("should create an exercise", async () => {
        const token = await this.logHas('pseudo')
        const res = await this.post("/exercises", {
          name: "test",
          status: "Ongoing",
          type: "ExquisiteCorpse",
          config: {
            initialText: "test",
            iterationDuration: 900,
            nbIterations: 10,
            textSize: { maxWords: 100, minWords: 10 },
          }
        }, token);
        expect(res.status).toBe(201);
      })

      it("should refuse to create an exercise without token", async () => {
        const res = await this.post("/exercises", {
          name: "test",
          status: "Ongoing",
          type: "ExquisiteCorpse",
          config: {
        initialText: "test",
        iterationDuration: 900,
        nbIterations: 10,
        textSize: { maxWords: 100, minWords: 10 },
          }
        });
        expect(res.status).toBe(401);
      });

      it("should get exercises with token", async () => {
        const token = await this.logHas('pseudo');
        const res = await this.get("/exercises", token);
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
        const token = await this.logHas('pseudo');
        const res = await this.get(`/exercises/${this.exerciseId}`, token);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(
          expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        status: expect.any(String),
        type: expect.any(String),
        config: expect.objectContaining({
          initialText: expect.any(String),
          iterationDuration: expect.any(Number),
          nbIterations: expect.any(Number),
          textSize: expect.objectContaining({
            maxWords: expect.any(Number),
            minWords: expect.any(Number),
          }),
        }),
        content: expect.objectContaining({
          scenes: expect.arrayContaining([
            expect.objectContaining({
          id: expect.any(Number),
          text: expect.any(String),
          author: expect.objectContaining({
            uid: expect.any(String),
            name: expect.any(String),
          }),
            }),
          ]),
        }),
        participants: expect.arrayContaining([
          expect.objectContaining({
            uid: expect.any(String),
            name: expect.any(String),
            isAdmin: expect.any(Boolean),
          }),
        ]),
        _links: expect.objectContaining({
          self: expect.any(String),
          connect: expect.any(String),
          delete: expect.any(String),
          finish: expect.any(String),
          invite: expect.any(String),
          removeParticipant: expect.any(String),
          takeTurn: expect.any(String),
        }),
          })
        );
      });

      it("should take turn on exquisite-corpse", async () => {
        const token = await this.logHas('pseudo');
        const res = await this.post(`/exquisite-corpse/${this.exerciseId}/take-turn`, {}, token);
        expect(res.status).toBe(204);
      });

      it("should submit turn on exquisite-corpse", async () => {
        const token = await this.logHas('pseudo');
        const res = await this.post(`/exquisite-corpse/${this.exerciseId}/submit-turn`, {
          content: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        }, token);
        expect(res.status).toBe(204);
      });

      it("should refuse to delete exercise without token", async () => {
        const res = await this.delete(`/exercises/${this.exerciseId}`);
        expect(res.status).toBe(401);
      });

      it("should delete exercise with token", async () => {
        const token = await this.logHas('pseudo');
        const res = await this.delete(`/exercises/${this.exerciseId}`, token);
        expect(res.status).toBe(204);
      });
    })
  }
}
