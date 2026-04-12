import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCaseStudyBySlug } from '@/lib/getCaseStudy';

interface CaseStudyDetailType {
  title: string;
  content: string;
  slug: string;
}

const CaseStudyDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [caseStudy, setCaseStudy] = useState<CaseStudyDetailType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudy = async () => {
      if (!slug) {
        console.error("Slug is undefined. Cannot fetch case study.");
        setLoading(false);
        return;
      }

      try {
        const caseStudyData = await getCaseStudyBySlug(slug);
        setCaseStudy(caseStudyData || null);
      } catch (error) {
        console.error("Error fetching case study:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="text-center py-10">
          <p>Loading case study...</p>
        </div>
      </Layout>
    );
  }

  if (!caseStudy) {
    return (
      <Layout>
        <div className="text-center py-10">
          <h1 className="text-2xl font-medium mb-4">Case Study Not Found</h1>
          <p className="mb-6">The case study you're looking for doesn't exist.</p>
          <Link to="/case-studies" className="text-accent hover:underline">
            Back to Case Studies
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8">
        <div className="mb-6">
          <Link to="/case-studies" className="text-accent hover:underline">
            Back to Case Studies
          </Link>
        </div>

        <article>
          <h1 className="text-3xl md:text-4xl font-medium mb-4">{caseStudy.title}</h1>
          <div
            className="prose prose-lg max-w-none mt-6"
            dangerouslySetInnerHTML={{ __html: caseStudy.content }}
          />
        </article>
      </div>
    </Layout>
  );
};

export default CaseStudyDetail;
