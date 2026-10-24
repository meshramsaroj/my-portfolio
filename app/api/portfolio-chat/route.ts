import { NextResponse } from "next/server";
import {
    answerPortfolioQuestion,
    getPortfolioSectionLink,
    getSuggestedQuestions,
} from "@/lib/portfolioChatEngine";

export async function GET() {
    return NextResponse.json({
        suggestions: getSuggestedQuestions(),
    });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (
            typeof body.question !== "string" ||
            !body.question.trim() ||
            body.question.length > 1000
        ) {
            return NextResponse.json(
                { error: "Please enter a question up to 1000 characters." },
                { status: 400 }
            );
        }

        const answer = answerPortfolioQuestion(body.question);

        return NextResponse.json({
            answer,
            sectionLink: getPortfolioSectionLink(body.question),
            suggestions: getSuggestedQuestions(body.question),
        });


    } catch {
        return NextResponse.json(
            { error: "Unable to process your question." },
            { status: 500 }
        );
    }



}