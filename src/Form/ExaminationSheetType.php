<?php

namespace App\Form;

use App\Entity\Exam;
use App\Entity\ExaminationSheet;
use App\Entity\User;
use Symfony\Bridge\Doctrine\Form\Type\EntityType;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class ExaminationSheetType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options): void
    {
        $builder
            ->add('student', EntityType::class, [
                'class' => User::class,
                'choice_label' => function (?User $user) {
                    return $user->getEmail();
                }
            ])
            ->add('exam', EntityType::class, [
                'class' => Exam::class,
                'choice_label' => function (?Exam $exam) {
                    return $exam->getDescription();
                }
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver): void
    {
        $resolver->setDefaults([
            'data_class' => ExaminationSheet::class,
        ]);
    }
}
