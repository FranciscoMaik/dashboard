import {
  FeedbackOverview,
  FeedbackTable,
  HeaderFeedbacks,
} from "@/modules/feedbacks/components";

export default function FeedbacksPage() {
  return (
    <div className="flex flex-col gap-8 w-full max-w-screen-2xl mx-auto pb-10 fade-in">
      <HeaderFeedbacks />

      <FeedbackOverview />
      <FeedbackTable />
    </div>
  );
}
