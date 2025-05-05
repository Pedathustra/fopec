  
if exists( select name from sys.procedures where name = 'getVotes')
begin
	drop proc getVotes
end
go

create proc getVotes
	@person_id int 
as 
	set nocount on;
		
 
		
select	  
		c.name company_name
	,	ot.description ownership_type_description
	,	parent_company.name parent_company_name
	,   cr.id
	,	cr.notes
	,	p.username observer
	,	p.id observer_id
	,	sum(case when crv.vote_type = 'up' then 1 else 0 end) up_count
	,	sum(case when crv.vote_type = 'down' then 1 else 0 end) down_count
	,	has_user_voted = sum(case when crv.person_id  = @person_id then 1 else 0  end) -- person has already voted on this
	,	is_observer  = sum(case when cr.observing_person_id = @person_id then 1 else 0  end) -- person has already voted on this
	,	created = max(crv.created)
from company c
	join crowdsourced_research cr on c.id = cr.company_id
	join ownership_type ot on cr.ownership_type_id = ot.id
	left join company parent_company on cr.parent_company_id = parent_company.id
	join person p on cr.observing_person_id = p.id
	left join crowdsourced_research_vote crv on cr.id = crv.crowdsourced_research_id
--where cr.observing_person_id != 0
group by 
		c.name  
	,	ot.description 
	,	parent_company.name  
	,   cr.id
	,	cr.notes
	,	p.username 
	,	p.id
	
order by created desc
go

 


exec getVotes @person_id = 156
 
 