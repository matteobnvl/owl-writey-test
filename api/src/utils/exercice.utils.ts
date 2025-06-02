import { User } from "../type/user.type";
import { TestUtils } from "./test.utils";

export class ExerciceUtils {
    private static exerciseId: string = "";
    private testUtils: TestUtils;

    constructor(testUtils: TestUtils) {
        this.testUtils = testUtils;
    }

    async CreateExercise(user: User): Promise<any> {
        const token = await this.testUtils.logHas(user)
        // TODO: pas finit, faut implémenter tout le utils puis faire les instanciations

        const response = await this.testUtils.post("/exercises", {
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
        return response
    }

    async getExercises(user: User): Promise<any> {
        const token = await this.testUtils.logHas(user);
        const response = await this.testUtils.get("/exercises", token);
        return response;
    }

    async getExerciseById(user: User, id: string): Promise<any> {
        const token = await this.testUtils.logHas(user);
        const response = await this.testUtils.get(`/exercises/${id}`, token);
        return response;
    }

    async deleteExercise(user: User, id: string): Promise<any> {
        const token = await this.testUtils.logHas(user);
        const response = await this.testUtils.delete(`/exercises/${id}`, token);
        return response;
    }
}
