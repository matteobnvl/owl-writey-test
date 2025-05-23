import { User } from "../type/user.type";
import { TestUtils } from "./test.utils";

export class ExerciceUtils {
    private static exerciseId: string = "";
    private testUtils: TestUtils;

    constructor(testUtils: TestUtils) {
        this.testUtils = testUtils;
    }

    async CreateExercise(user: User, data: Object = {}): Promise<void> {
        const token = this.testUtils.logHas(user)
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
        if (response.status === 201) {
            const exerciseId = response.body.id; // Adjust based on API response
            ExerciceUtils.setExerciseId(exerciseId);
        } else {
            throw new Error(`Failed to create exercise: ${response.status}`);
        }
    }

    static getExerciseId(): string {
        return this.exerciseId;
    }

    static setExerciseId(id: string) {
        this.exerciseId = id;
    }
}
