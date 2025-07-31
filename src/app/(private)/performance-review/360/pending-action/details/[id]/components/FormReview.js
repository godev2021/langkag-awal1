'use client';

import FullscreenModal from '@/components/FullscreemModal';
import { ratingOptions } from '@/utils/formReview';
import { useState, useMemo } from 'react';

export default function FormReview({ isOpen, setIsOpen, dataEmployeeDetail }) {
    const [reviewContribution, setReviewContribution] = useState('');
    const [reviewStrength, setReviewStrength] = useState('');
    const [reviewDevelopment, setReviewDevelopment] = useState('');
    const [answers, setAnswers] = useState({});

    const handleChange = (index, value) => {
        setAnswers((prev) => ({
            ...prev,
            [index]: parseFloat(value),
        }));
    };

    const average = useMemo(() => {
        const values = Object.values(answers);
        if (values.length === 0) return 0;
        const total = values.reduce((sum, val) => sum + val, 0);
        return total / values.length;
    }, [answers]);

    
    const reviewerId = 1; // yang sedang kita review
    const reviewType = 'peer'; // peer / manager / self

    const competencyQuestions = [
        {
            question:
                'QUALITY OF WORK: Take ownership of their tasks and deliver results. / Mengambil tanggung jawab atas tugas mereka dan memberikan hasil yang nyata.',
            description:
                'Mengambil tanggung jawab atas pekerjaan sendiri dan mengeksekusinya dengan standar kualitas tinggi.',
            options: ratingOptions,
        },
        {
            question:
                'QUALITY OF WORK: Evidence commitment to delivering high-quality work through rigorous planning and organization, setting and achieving high standards. / Menunjukkan komitmen yang kuat untuk menghasilkan pekerjaan berkualitas tinggi melalui perencanaan yang matang, pengorganisasian, serta penetapan dan pencapaian standar yang tinggi.',
            description:
                'Menunjukkan konsistensi dalam memberikan hasil kerja yang berkualitas dari waktu ke waktu.',
            options: ratingOptions,
        },
        {
            question:
                "PROBLEM SOLVING: Demonstrate initiative in identifying and solving challenges to ensure the organization's success.  Menunjukkan inisiatif dalam mengenali dan menyelesaikan tantangan guna memastikan keberhasilan organisasi.",
            description:
                'Menganalisis situasi yang kompleks dan menemukan solusi yang efektif.',
            options: ratingOptions,
        },
        {
            question:
                'COMMUNICATION: Demonstrate their ability to listen to others, understand their viewpoints, and create an inclusive environment where others feel valued and understood. / Menunjukkan kemampuan untuk mendengarkan orang lain, memahami sudut pandang mereka, dan menciptakan lingkungan yang inklusif di mana setiap orang merasa dihargai dan dipahami.',
            description:
                'Menyampaikan ide, pembaruan, dan umpan balik dengan jelas dalam bentuk lisan dan tulisan.',
            options: ratingOptions,
        },
        {
            question:
                "COLLABORATION: Demonstrate the capability to work effectively within a team and make decisions that prioritize what's best for EDTS as a whole. / Menunjukkan kemampuan untuk bekerja secara efektif dalam tim dan mengambil keputusan yang mengutamakan kepentingan terbaik bagi EDTS secara keseluruhan.",
            description:
                'Berpartisipasi aktif dalam kegiatan tim dan mendukung rekan kerja.',
            options: ratingOptions,
        },
    ];
    const handleSubmit = async () => {
        const payload = {
            employeeId:dataEmployeeDetail?.id,
            reviewerId,
            reviewScore: parseFloat(average.toFixed(1)),
            reviewContribution,
            reviewStrength,
            reviewDevelopment,
            type: reviewType,
        };

        try {
            const res = await fetch(
                'http://34.101.38.23:8080/api/three-sixty',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                throw new Error('Failed to submit review');
            }

            //const result = await res.json();
            //console.log('Review submitted:', result);
            setIsOpen(false);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <FullscreenModal
                title='Form Review'
                isOpen={isOpen}
                setIsOpen={setIsOpen}
            >
                {/* Header Info */}
                <div className='flex flex-col h-full'>
                    {/* Header */}
                    <div className='bg-white px-6 py-4 shadow-md z-10 flex-none sticky top-0'>
                        <div className='flex items-center gap-4'>
                            <div className='avatar placeholder'>
                                <div className='bg-neutral text-neutral-content rounded-full w-12 flex items-center justify-center'>
                                    {/* <span className='text-sm'>AA</span> */}
                                </div>
                            </div>
                            <div>
                                <p className='font-semibold'>
                                    {dataEmployeeDetail?.name}
                                </p>
                                <p className='text-sm text-gray-500'>
                                    {`${dataEmployeeDetail?.jobTitle}, ${dataEmployeeDetail?.divisionName}`}
                                    
                                </p>
                            </div>
                            <div className='ml-auto'>
                                <div className='badge badge-warning text-white text-sm py-2 px-4 rounded-lg'>
                                    Final score {average.toFixed(1)}
                                </div>
                            </div>
                        </div>

                        <div className='mt-4'>
                            <h3 className='text-lg font-semibold'>
                                2025 Mid Year PA - Competency Review (IC)
                            </h3>
                            <div className='flex items-center text-sm text-gray-500 gap-4 mt-1'>
                                <span>📝 Performance review</span>
                                <span>📅 1 Jan - 15 Jun 2025</span>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className='flex-1 overflow-y-auto p-6 bg-gray-100'>
                        <h4 className='font-semibold text-lg mb-2'>
                            Competencies
                        </h4>
                        <p className='text-sm text-gray-500 mb-4'>
                            Specific skill, behavior, or attribute needed to
                            perform a job effectively. / Kemampuan, perilaku,
                            atau atribut spesifik yang dibutuhkan untuk
                            menjalankan pekerjaan secara efektif.
                        </p>

                        {competencyQuestions.map((item, index) => (
                            <div className='mb-4' key={index}>
                                <p className='font-medium mb-1'>
                                    {item.question}
                                </p>
                                <p className='text-sm text-gray-500 mb-2'>
                                    {item.description}
                                </p>
                                <select
                                    className='select select-bordered w-full mb-2'
                                    onChange={(e) =>
                                        handleChange(index, e.target.value)
                                    }
                                    value={answers[index] || ''}
                                >
                                    <option value='' disabled>
                                        -- Pilih skor --
                                    </option>
                                    {item.options.map((opt) => (
                                        <option
                                            key={opt.value}
                                            value={opt.value}
                                        >
                                            {opt.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}

                        {/* General Feedback */}
                        <div className='mt-6'>
                            <h5 className='font-semibold mb-2'>
                                Masukan Tambahan
                            </h5>
                            <textarea
                                className='textarea textarea-bordered w-full'
                                placeholder='Masukkan masukan atau tambahan umum untuk karyawan ini'
                            ></textarea>
                        </div>

                        <div className='p-4 bg-white rounded-lg mt-4'>
                            <h3 className='font-semibold'>
                                Contribution, Strength, & Development
                            </h3>
                            <div className='mt-4'>
                                <label className=' mb-1 block'>
                                    CONTRIBUTION: Briefly outline 1-2 tasks,
                                    projects, or initiatives you collaborated on
                                    with your peer/ stakeholder between January
                                    - June 2025 period / Jelaskan secara singkat
                                    1–2 tugas, proyek, atau inisiatif yang Anda
                                    kerjakan bersama rekan kerja atau
                                    stakeholder dalam periode Januari - Juni
                                    2025
                                </label>
                                <textarea
                                    className='textarea textarea-bordered w-full'
                                    placeholder='Masukkan kontribusi karyawan'
                                    value={reviewContribution}
                                    onChange={(e) =>
                                        setReviewContribution(e.target.value)
                                    }
                                />
                            </div>

                            {/* Strength */}
                            <div className='mt-4'>
                                <label className=' mb-1 block'>
                                    STRENGTHS: Highlight their 1-2 areas of
                                    strength. Refer to specific competencies,
                                    skills, attributes or behaviors in which
                                    your peer/ stakeholder consistently
                                    demonstrates high proficiency and how this
                                    has contributed to the business. Please
                                    provide 1-2 specific examples from the last
                                    six months that exemplify these strengths. /
                                    Soroti 1–2 area kekuatan mereka. Jelaskan
                                    kompetensi, keterampilan, atribut, atau
                                    perilaku spesifik di mana rekan
                                    kerja/stakeholder Anda secara konsisten
                                    menunjukkan kemahiran tinggi dan bagaimana
                                    hal tersebut berkontribusi pada bisnis.
                                    Harap sertakan 1–2 contoh nyata dari enam
                                    bulan terakhir yang menggambarkan kekuatan
                                    tersebut.
                                </label>
                                <textarea
                                    className='textarea textarea-bordered w-full'
                                    placeholder='Masukkan kekuatan atau kelebihan karyawan'
                                    value={reviewStrength}
                                    onChange={(e) =>
                                        setReviewStrength(e.target.value)
                                    }
                                />
                            </div>

                            {/* Development */}
                            <div className='mt-4'>
                                <label className=' mb-1 block'>
                                    DEVELOPMENT: Identify 1-2 key areas of
                                    growth. Refer to specific competencies,
                                    skills, attributes or behaviors in which
                                    your peer/ stakeholder has an opportunity to
                                    grow or develop. Please explain how focusing
                                    on these aspects over the next six months
                                    will enhance their impact on the team or
                                    targets. / Identifikasi 1–2 area utama yang
                                    dapat dikembangkan. Jelaskan kompetensi,
                                    keterampilan, atribut, atau perilaku
                                    spesifik yang menjadi peluang pertumbuhan
                                    bagi rekan kerja/stakeholder Anda. Jelaskan
                                    pula bagaimana fokus pada aspek ini dalam
                                    enam bulan ke depan akan meningkatkan
                                    dampaknya terhadap tim atau target kerja.
                                </label>
                                <textarea
                                    className='textarea textarea-bordered w-full'
                                    placeholder='Masukkan area yang bisa dikembangkan'
                                    value={reviewDevelopment}
                                    onChange={(e) =>
                                        setReviewDevelopment(e.target.value)
                                    }
                                />
                            </div>
                        </div>
                        {/* Contribution */}
                    </div>

                    {/* Footer */}
                    <div className='bg-white p-4 shadow-md flex justify-end items-center gap-2 flex-none sticky bottom-0'>
                        <button
                            className='btn btn-outline rounded'
                            onClick={() => setIsOpen(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className='btn btn-primary rounded'
                            onClick={handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </FullscreenModal>
        </>
    );
}
