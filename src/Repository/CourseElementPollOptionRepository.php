<?php

namespace App\Repository;

use App\Entity\CourseElementPollOption;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<CourseElementPollOption>
 *
 * @method CourseElementPollOption|null find($id, $lockMode = null, $lockVersion = null)
 * @method CourseElementPollOption|null findOneBy(array $criteria, array $orderBy = null)
 * @method CourseElementPollOption[]    findAll()
 * @method CourseElementPollOption[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class CourseElementPollOptionRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, CourseElementPollOption::class);
    }

    public function save(CourseElementPollOption $entity, bool $flush = false): void
    {
        $this->getEntityManager()->persist($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

    public function remove(CourseElementPollOption $entity, bool $flush = false): void
    {
        $this->getEntityManager()->remove($entity);

        if ($flush) {
            $this->getEntityManager()->flush();
        }
    }

//    /**
//     * @return CourseElementPollOption[] Returns an array of CourseElementPollOption objects
//     */
//    public function findByExampleField($value): array
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->orderBy('c.id', 'ASC')
//            ->setMaxResults(10)
//            ->getQuery()
//            ->getResult()
//        ;
//    }

//    public function findOneBySomeField($value): ?CourseElementPollOption
//    {
//        return $this->createQueryBuilder('c')
//            ->andWhere('c.exampleField = :val')
//            ->setParameter('val', $value)
//            ->getQuery()
//            ->getOneOrNullResult()
//        ;
//    }
}
