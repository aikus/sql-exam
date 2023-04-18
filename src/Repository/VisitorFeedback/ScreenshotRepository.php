<?php

namespace App\Repository\VisitorFeedback;

use App\Entity\VisitorFeedback\Screenshot;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Screenshot>
 *
 * @method Screenshot|null find($id, $lockMode = null, $lockVersion = null)
 * @method Screenshot|null findOneBy(array $criteria, array $orderBy = null)
 * @method Screenshot[]    findAll()
 * @method Screenshot[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class ScreenshotRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Screenshot::class);
    }

    public function save(Screenshot $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(Screenshot $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return VisitorFeedbackScreenshot[] Returns an array of VisitorFeedbackScreenshot objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('i.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?VisitorFeedbackScreenshot
//    {
//        return $this->createQueryBuilder('i')
//            ->andWhere('i.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
