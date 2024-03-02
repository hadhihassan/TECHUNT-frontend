import { JobInterface } from "../interface/interfaces";

export function findMostSuitableJobPost(jobPosts: JobInterface[], requiredSkills: string[]) {
    let mostSuitableJobPost :JobInterface[] = []
    for (const jobPost of jobPosts) {
        const score = calculateSuitabilityScore(jobPost.Skills, requiredSkills);
        if (score > 0) {
            mostSuitableJobPost.push(jobPost)
        }
    }
    console.log(mostSuitableJobPost,"the most sutable post in skillsbase ")
    return mostSuitableJobPost;
}
function calculateSuitabilityScore(skills: string[], requiredSkills: string[]): number {
    let score = 0;
    console.log(skills)
    for (const skill of skills) {
        console.log(skill);
        if (requiredSkills?.includes(skill)) {
            score++;
        }
    }
    return score;
}