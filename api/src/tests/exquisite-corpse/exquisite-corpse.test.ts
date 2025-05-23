import { AbstractTest } from "../core/AbstractTest";

export class ExquisiteCorpseTest extends AbstractTest {
  private exerciseId: string = "";

  async run() {
    describe("Exercises API", () => {
        it("should refuse access to exercises without token", async () => {
            const res = await this.get("/exercises");
            expect(res.status).toBe(401);
        })
  })
}

new ExquisiteCorpseTest().run();